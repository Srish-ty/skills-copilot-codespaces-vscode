// create web server for comment
// Import modules
const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

// Handle request
router.get('/', CommentController.getComments);
router.get('/create', CommentController.createCommentPage);
router.post('/create', CommentController.createComment);
router.get('/:id/delete', CommentController.deleteComment);
router.get('/:id/update', CommentController.updateCommentPage);
router.post('/:id/update', CommentController.updateComment);

// Export module
module.exports = router;
