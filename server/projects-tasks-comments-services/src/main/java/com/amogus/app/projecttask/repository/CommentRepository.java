package com.amogus.app.projecttask.repository;

import com.amogus.app.projecttask.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    /**
     * Возвращает страницу комментариев, связанных с указанной задачей.
     *
     * @param taskId   Идентификатор задачи, к которой относятся комментарии.
     * @param pageable Параметры пагинации (номер страницы, размер страницы, сортировка).
     * @return Страница комментариев {@link Page<Comment>}, связанных с указанной задачей.
     */
    Page<Comment> findByTaskId(Long taskId, Pageable pageable);
}
