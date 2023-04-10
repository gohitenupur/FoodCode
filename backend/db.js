const mongoose = require("mongoose");

const mongoDB = () => {
  
  mongoose
    .connect(process.env.BASE_URL, {useNewUrlParser: true,
      useUnifiedTopology: true})
    .then(() => {
      console.log("Database connected successfully");
      const foodDataPromise = mongoose
        .connection.db.collection("foodData")
        .find({})
        .toArray();
      const foodCategoryPromise = mongoose
        .connection.db.collection("foodCategory")
        .find({})
        .toArray();
      Promise.all([foodDataPromise, foodCategoryPromise])
        .then(([foodData, foodCategory]) => {
          global.foodData = foodData;
          global.foodCategory = foodCategory;
          // console.log("Food data:", global.foodData);
          // console.log("Food category:", global.foodCategory);
        })
        .catch((error) => {
          console.log("Error while fetching data:", error);
        });
    })
    .catch((error) => {
      console.log("Error while connecting to the database:", error);
    });
};

module.exports = mongoDB;
