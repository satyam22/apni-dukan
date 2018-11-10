import pool from './../db/pool';

const GET_ALL_PRODUCTS = `select * from products limit ?, ?`
const GET_WITOUT_OFFER_PRODUCTS = `select * from products where offer = 0 limit ?, ?`;
const GET_OFFER_COUNT_PRODUCTS = `select count(*) from products where offer > 0`;

const GET_OFFER_PRODUCTS = `select * from products where offer > 0 limit ?, ?`;
const GET_PRODUCT = `select * from products where productName = ?`
const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;

const getAllProducts = async (req, res) => {
  let { limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  try {
    const results = await pool.query(GET_ALL_PRODUCTS,[skip,limit]);
    res.status(200).json({ ok: true, count: results.length, results, total});
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getWithoutOfferProducts = async (req, res) => {
  let { limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  try {
    const results = await pool.query(GET_WITOUT_OFFER_PRODUCTS,[skip,limit]);
    const count = await pool.query(GET_OFFER_COUNT_PRODUCTS);
    res.status(200).json({ ok: true, count: results.length, results, totalCount: count});
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getOfferProducts = async (req, res) => {
  let { limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  try {
    const results = await pool.query(GET_OFFER_PRODUCTS,[skip,limit]);
    res.status(200).json({ ok: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getProductByName = async (req, res) => {
  let { name } = req.query;
  name = name.replace(/['"]+/g,'');
  
  if (!name) return res.status(400).json({ ok: false, message: "Product name is required to get product" });
  try {
    const results = await pool.query(GET_PRODUCT, [name]);
    res.status(200).json({ ok: true, results });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// const getProductByPrice = async (req, res) => {

// }

module.exports = {
  getAllProducts,
  getOfferProducts,
  getWithoutOfferProducts,
  getProductByName
}