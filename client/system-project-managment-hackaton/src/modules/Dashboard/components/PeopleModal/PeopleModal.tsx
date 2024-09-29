import React from 'react';
import { Modal, Button, Input, Select, Table } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './PeopleModal.module.scss';

const { Option } = Select;

const PeopleModal = ({ onClose }: { onClose: () => void }) => {
    const users = [
    { key: '1', firstName: 'Иванов', lastName: 'Иван', email: 'ivanov@yandex.ru', role: 'Роль' },
    { key: '2', firstName: 'Иванов', lastName: 'Иван', email: 'ivanov@yandex.ru', role: 'Администратор' },
  ];

  const columns = [
    { title: 'Фамилия', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Имя', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Почта', dataIndex: 'email', key: 'email' },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Select defaultValue={role} style={{ width: 150 }}>
          <Option value="Роль">Роль</Option>
          <Option value="Администратор">Администратор</Option>
        </Select>
      ),
    },
    {
      title: '',
      key: 'action',
      render: () => <Button type="text" icon={<DeleteOutlined />} danger>Удалить пользователя</Button>,
    },
  ];

  return (
    <Modal title="IT INNO HACK"  onCancel={onClose} footer={null} width={800}>
      <div className={styles.addUser}>
        <Input prefix={<SearchOutlined />} placeholder="Введите почту" className={styles.input} />
        <Button type="primary" className={styles.addButton}>Добавить участника</Button>
      </div>
      <Table columns={columns} dataSource={users} pagination={false} />
    </Modal>
  );
};

export default PeopleModal;
