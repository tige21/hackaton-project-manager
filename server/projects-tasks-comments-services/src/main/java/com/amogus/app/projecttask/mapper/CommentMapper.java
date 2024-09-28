package com.amogus.app.projecttask.mapper;

import com.amogus.app.projecttask.dto.CommentDto;
import com.amogus.app.projecttask.entity.Comment;
import org.mapstruct.Mapper;

@Mapper
public interface CommentMapper {
    CommentDto toDto(Comment comment);
    Comment toEntity(CommentDto commentDto);
}
