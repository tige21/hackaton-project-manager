package com.amogus.app.projecttask.service.impl;

import com.amogus.app.projecttask.dto.CommentDto;
import com.amogus.app.projecttask.dto.PaginatedCommentsDto;
import com.amogus.app.projecttask.entity.Comment;
import com.amogus.app.projecttask.entity.Task;
import com.amogus.app.projecttask.exception.CommentNotFoundException;
import com.amogus.app.projecttask.exception.TaskNotFoundException;
import com.amogus.app.projecttask.mapper.CommentMapper;
import com.amogus.app.projecttask.repository.CommentRepository;
import com.amogus.app.projecttask.repository.TaskRepository;
import com.amogus.app.projecttask.service.CommentService;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final CommentMapper commentMapper;

    @Override
    public CommentDto createComment(CommentDto commentDto) {
        log.info("Создание нового комментария для задачи с ID: {}", commentDto.getTaskId());
        Task task = taskRepository.findById(commentDto.getTaskId())
                .orElseThrow(() -> new TaskNotFoundException("Задача с id: " + commentDto.getTaskId() + " не найдена"));
        Comment comment = commentMapper.toEntity(commentDto);
        comment.setTask(task);
        comment.setCreatedDate(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);
        log.info("Комментарий успешно создан: {}", savedComment.getId());
        return commentMapper.toDto(savedComment);
    }

    @Override
    public PaginatedCommentsDto getCommentsByTaskId(Long taskId, int page, int size) {
        log.info("Получение комментариев для задачи с ID: {}", taskId);
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<Comment> commentPage = commentRepository.findByTaskId(taskId, pageRequest);

        PaginatedCommentsDto paginatedCommentsDto = new PaginatedCommentsDto();
        paginatedCommentsDto.setComments(commentPage.getContent().stream()
                .map(commentMapper::toDto)
                .toList());
        paginatedCommentsDto.setCurrentPage(commentPage.getNumber() + 1);
        paginatedCommentsDto.setTotalPages(commentPage.getTotalPages());
        paginatedCommentsDto.setTotalElements(commentPage.getTotalElements());

        return paginatedCommentsDto;
    }

    @Override
    public Optional<CommentDto> getCommentById(Long id) {
        log.info("Получение комментария по ID: {}", id);
        Optional<Comment> commentOpt = commentRepository.findById(id);
        if (commentOpt.isPresent()) {
            log.info("Комментарий с ID {} найден", id);
            return commentOpt.map(commentMapper::toDto);
        } else {
            log.error("Комментарий с ID {} не найден", id);
            throw new CommentNotFoundException("Комментарий с id: " + id + " не найден");
        }
    }

    @Override
    public CommentDto updateComment(Long id, CommentDto commentDto) {
        log.info("Обновление комментария с ID: {}", id);
        Optional<Comment> commentOpt = commentRepository.findById(id);
        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            comment.setContent(commentDto.getContent());
            comment.setUpdatedDate(LocalDateTime.now());
            Comment updatedComment = commentRepository.save(comment);
            log.info("Комментарий с ID {} успешно обновлен", id);
            return commentMapper.toDto(updatedComment);
        } else {
            log.error("Комментарий с ID {} не найден для обновления", id);
            throw new CommentNotFoundException("Комментарий с id: " + id + " не найден");
        }
    }

    @Override
    public void deleteComment(Long id) {
        log.info("Удаление комментария с ID: {}", id);
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            log.info("Комментарий с ID {} успешно удален", id);
        } else {
            log.error("Комментарий с ID {} не найден для удаления", id);
            throw new CommentNotFoundException("Комментарий с id: " + id + " не найден для удаления");
        }
    }
}
