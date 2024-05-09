import {useEffect, useState} from 'react';
import ContactList from "./ContactList.jsx";
import './App.css';
import ContactForm from "./ContactForm.jsx";

function App() {
	const [contacts, setContacts] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentContact, setCurrentContact] = useState({});

	useEffect(() => {
		fetchContacts()
	}, []);

	const fetchContacts = async () => {
		const response = await fetch("http://127.0.0.1:5000/contacts")
		const data = await response.json()
		setContacts(data.contacts)
	};

	const closedModal = () => {
		setIsModalOpen(false)
		setCurrentContact({})
	};

	const openCreateModal = () => {
		if (!isModalOpen) {
			setIsModalOpen(true);
		}
	};

	const openEditModal = (contact) => {
		if (isModalOpen) return
		setCurrentContact(contact);
		setIsModalOpen(true);
	};

	const onUpdate = () => {
		closedModal();
		fetchContacts();
	};

	return (
		<>
			<ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
			<button onClick={openCreateModal}>Create New Contact</button>
			{ isModalOpen && <div className="modal">
				<div className="content">
					<span className="close" onClick={closedModal}>&times;</span>
					<ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
				</div>
			</div>
			}
		</>
	);
}

export default App;
