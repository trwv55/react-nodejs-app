import PostModel from "../models/post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewesCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось вернуть статью",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }
        res.json(doc);
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postIdd = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postIdd,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить статью",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }

        res.json({
          success: true,
        });
      },
    );

    const postId = req.params.id;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postIdd = req.params.id;

    await PostModel.updateOne(
      {
        _id: postIdd,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};
