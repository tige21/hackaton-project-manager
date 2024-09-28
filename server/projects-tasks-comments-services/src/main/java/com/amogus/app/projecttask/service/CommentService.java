package com.amogus.app.projecttask.service;

import com.amogus.app.projecttask.dto.CommentDto;
import com.amogus.app.projecttask.dto.PaginatedCommentsDto;
import java.util.Optional;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto);

    PaginatedCommentsDto getCommentsByTaskId(Long taskId, int page, int size);

    Optional<CommentDto> getCommentById(Long id);

    CommentDto updateComment(Long id, CommentDto commentDto);

    void deleteComment(Long id);
}
