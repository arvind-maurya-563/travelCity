const mongoose = require("mongoose");

const connection = async () => {
  try {
    const url = `mongodb+srv://arvind_maurya:arvind_194@cluster0.qxv1nzm.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(url);
    console.log('datbase connected')
  } catch (error) {
    console.log(error);
  }
};
module.exports = {connection};