import Categories from "../models/categoriesModel.js";

const addCategory = async (req, res) => {
  try {
    const userId = req.user.id;    
    const { name } = req.body;

    const category = await Categories.findOne({ name, userId });

    if (category) {
      return res.status(400).json({
        status: "error",
        message: "Категорія з таким іменем вже існує.",
      });
    }

    const newCategory = new Categories({ name, userId });

    await newCategory.save();

    return res.status(201).json({
      status: "success",
      message: "Транзакцію додано.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;

    const category = await Categories.findOneAndDelete({ _id: categoryId, userId });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Категорію не знайдено.",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Категорію видалено.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await Categories.find({ userId }).select("-__v -userId");

    return res.status(200).json({
      status: "success",
      categories: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

export { 
  addCategory,
  deleteCategory,
  getCategories,
};
