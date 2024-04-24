const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  const { name, credits, teacher, career } = req.body;

  try {
    const course = new Course({
      name: name,
      credits: credits,
      teacher: teacher,
      career: career
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error while saving the course', error);
    res.status(422).json({ error: 'There was an error saving the course' });
  }
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id).populate('teacher')
      .then( (course) => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      });
  } else {
    // get all teachers
    Course.find().populate('teacher')
      .then( courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

module.exports = {
  coursePost,
  courseGet
}