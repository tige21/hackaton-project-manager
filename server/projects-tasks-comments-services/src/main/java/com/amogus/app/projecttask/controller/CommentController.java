package com.amogus.app.projecttask.controller;

import com.amogus.app.projecttask.api.CommentApi;
import com.amogus.app.projecttask.dto.CommentDto;
import com.amogus.app.projecttask.dto.PaginatedCommentsDto;
import com.amogus.app.projecttask.service.CommentService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController implements CommentApi {

    private final CommentService commentService;

    @Override
    public ResponseEntity<CommentDto> createComment(CommentDto commentDto) {
        CommentDto createdComment = commentService.createComment(commentDto);
        return ResponseEntity.ok(createdComment);
    }

    @Override
    public ResponseEntity<PaginatedCommentsDto> getCommentsByTaskId(Long taskId, int page, int size) {
        PaginatedCommentsDto paginatedComments = commentService.getCommentsByTaskId(taskId, page, size);
        return ResponseEntity.ok(paginatedComments);
    }

    @Override
    public ResponseEntity<CommentDto> getCommentById(Long id) {
        Optional<CommentDto> commentOpt = commentService.getCommentById(id);
        return commentOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<CommentDto> updateComment(Long id, CommentDto commentDto) {
        CommentDto updatedComment = commentService.updateComment(id, commentDto);
        return ResponseEntity.ok(updatedComment);
    }

    @Override
    public ResponseEntity<Void> deleteComment(Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
