import React, { useState } from 'react';
import { Modal, Button, Form, Input, Avatar, Select, DatePicker, Upload } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const CreateTaskModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = (info: any) => {
    setFileList(info.fileList);
  };

  const handleSubmit = () => {
    // Логика отправки данных формы
    console.log('Task created');
    onClose(); // Закрываем модалку после создания задачи
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      className="custom-task-modal"
      maskClosable={false} // Отключает закрытие при клике на фон
    >
      <Form layout="vertical">
        {/* Заголовок */}
        <h3>Создать задачу</h3>
        
        {/* Проект */}
        <Form.Item label="Проект">
          <Input value="IT INNO HACK" disabled />
        </Form.Item>

        {/* Дедлайн */}
        <Form.Item label="Дедлайн">
          <DatePicker style={{ width: '100%' }} placeholder="Выбрать дату" />
        </Form.Item>

        {/* Описание */}
        <Form.Item label="Описание">
          <TextArea placeholder="Введите описание задачи" rows={2} />
        </Form.Item>

        {/* Исполнители */}
        <Form.Item label="Исполнители">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Avatar.Group>
              <Avatar src="https://example.com/avatar1.jpg" />
              <Avatar src="https://example.com/avatar2.jpg" />
            </Avatar.Group>
            <Input placeholder="Введите почту участника" style={{ width: '60%' }} />
          </div>
        </Form.Item>

        {/* Тип задачи */}
        <Form.Item label="Тип">
          <Select defaultValue="Эпик">
            <Option value="Эпик">Эпик</Option>
            <Option value="Задача">Задача</Option>
            <Option value="Баг">Баг</Option>
          </Select>
        </Form.Item>

        {/* Приоритет задачи */}
        <Form.Item label="Приоритет">
          <Select defaultValue="Medium">
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
            <Option value="Critical">Critical</Option>
          </Select>
        </Form.Item>

        {/* Прикрепить файлы */}
        <Form.Item label="Прикрепить файлы">
          <Upload.Dragger
            multiple
            fileList={fileList}
            onChange={handleUpload}
            className="upload-dragger"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Нажмите, чтобы добавить или перетащите файл</p>
          </Upload.Dragger>
        </Form.Item>

        {/* Кнопка создания */}
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} style={{ width: '100%' }}>
            Создать задачу
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
