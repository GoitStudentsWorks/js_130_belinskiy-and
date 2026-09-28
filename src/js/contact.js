import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import onOpenModal from './success-modal';

const contactForm = document.querySelector('.contacts-form');

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  const { name, phone, message } = event.target.elements;
  const formData = {
    name: name.value.trim(),
    phone: phone.value.trim().replace(/\D/g, ''),
    message: message.value.trim(),
  };

  try {
    await axios.post(
      'https://wedding-photographer.b.goit.study/api/orders',
      formData
    );
    event.target.reset();
    onOpenModal();
  } catch (error) {
    if (error.response.data.message.startsWith('"name"')) {
      iziToast.error({
        position: 'topRight',
        message: 'Name must be at least 2 characters long',
      });
    } else if (error.response.data.message.startsWith('"phone"')) {
      iziToast.error({
        position: 'topRight',
        message: 'Phone number must have 12 digits. For example, "+380962223456"',
      });
    } else if (error.response.data.message.startsWith('"message"')) {
      iziToast.error({
        position: 'topRight',
        message: 'Message must be at least 5 characters long',
      });
    }
  }
});
