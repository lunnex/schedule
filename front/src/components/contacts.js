import React, { useState } from 'react';

const Contacts = () => {
  const [contacts, setContacts] = useState({
    faculty: [
      { id: 1, name: 'Иванов Иван Иванович', email: 'aaaaa@rsreu.edu', department: 'ФВТ' },
      { id: 2, name: 'Петров Петр Петрович', email: 'bbbbb@rsreu.edu', department: 'ФАИТУ' },
    ],
    administration: [
      { id: 3, name: 'Сидоров Сидор Сидорович', email: 'ccccc@rsreu.edu', position: 'Канцелярия' },
      { id: 4, name: 'Андреев Андрей Андреевич', email: 'ddddd@rsreu.edu', position: 'Библиотека' },
    ],
  });

  const handleDeleteContact = (category, id) => {
    setContacts({
      ...contacts,
      [category]: contacts[category].filter(contact => contact.id !== id),
    });
  };

  return (
    <div className="university-contacts-page">
      <h1>Контакты</h1>

      <div className="department-contacts">
        <h2>Факультеты</h2>
        <ul>
          {contacts.faculty.map(contact => (
            <li key={contact.id}>
              <div className="contact-details">
                <strong>{contact.name}</strong>
                <span>{contact.email}</span>
                <span>{contact.department}</span>
              </div>
              <button onClick={() => handleDeleteContact('faculty', contact.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="department-contacts">
        <h2>Администрация</h2>
        <ul>
          {contacts.administration.map(contact => (
            <li key={contact.id}>
              <div className="contact-details">
                <strong>{contact.name}</strong>
                <span>{contact.email}</span>
                <span>{contact.position}</span>
              </div>
              <button onClick={() => handleDeleteContact('administration', contact.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
