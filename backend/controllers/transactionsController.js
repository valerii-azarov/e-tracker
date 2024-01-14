import Transactions from "../models/transactionsModel.js";

const addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, amount, type, categoryId } = req.body;

    const newTransaction = new Transactions({
      title,
      description,
      amount,
      type,
      userId,
      categoryId,
    });

    await newTransaction.save();

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

const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = req.params.id;

    const transaction = await Transactions.findOneAndDelete({ _id: transactionId, userId });

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Транзакцію не знайдено.",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Транзакцію видалено.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transactions.find({ userId })
      .populate({ 
        path: "categoryId", 
        select: "-_id name",
      })
      .select("-__v -userId");

    const transactionsByDate = {};

    transactions.forEach(transaction => {
      const dateKey = new Date(transaction.date).toLocaleDateString();

      if (!transactionsByDate[dateKey]) {
        transactionsByDate[dateKey] = [];
      }
      
      transactionsByDate[dateKey].push(transaction);
    });

    return res.status(200).json({
      status: "success",
      transactions: transactionsByDate,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Помилка сервера.",
    });
  }
};

export { 
  addTransaction,
  deleteTransaction,
  getTransactions,
};
