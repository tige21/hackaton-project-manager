package com.amogus.app.projecttask.repository;

import com.amogus.app.projecttask.entity.Task;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    /**
     * Поиск задач по ID проекта с поддержкой пагинации.
     *
     * @param projectId ID проекта
     * @param pageable  параметры пагинации
     * @return страница задач, связанных с проектом
     */
    Page<Task> findByProjectId(Long projectId, Pageable pageable);

    List<Task> findByProjectId(Long projectId);

}
