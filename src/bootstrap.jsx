

import { useState } from 'react';
import { Button, Form, Modal, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Create a CSS file for custom styles

export function Example() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowEditModal(false);
    setInput('');
    setEditIndex(null);
  };
  
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAddItem = () => {
    if (editIndex !== null) {
      const updatedItems = items.map((item, index) =>
        index === editIndex ? { ...item, text: input } : item
      );
      setItems(updatedItems);
      setEditIndex(null);
      setShowEditModal(false);
    } else {
      setItems([...items, { text: input, status: 'pending' }]);
    }
    setInput('');
    setShow(false);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index) => {
    setInput(items[index].text);
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleStatusChange = (index, status) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, status: status } : item
    );
    setItems(updatedItems);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        {/* <Navbar.Brand href="#home">To-do</Navbar.Brand> */}
        <Nav className="ml-auto">
          <Button variant="primary" onClick={handleShow}>
            Add-Task
          </Button>
        </Nav>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={input}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            {editIndex !== null ? 'Save Changes' : 'Add Item'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit item"
                value={input}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="items-container">
        <h3>To-do-Work-List</h3>
        <ul className="items-list">
          {items.map((item, index) => (
            <li key={index} className={`item ${item.status}`}>
              {item.text}
              <div className="item-buttons">
                <Button variant="info" onClick={() => handleStatusChange(index, 'in-progress')}>
                  In Progress
                </Button>
                <Button variant="warning" onClick={() => handleEditItem(index)}>
                  Edit
                </Button>
                <Button variant="success" onClick={() => handleStatusChange(index, 'done')}>
                  Done
                </Button>
                <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}



