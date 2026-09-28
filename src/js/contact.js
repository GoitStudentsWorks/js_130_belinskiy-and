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
    phone: phone.value.trim(),
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
    iziToast.error({
      position: 'topRight',
      message: error.response.data.message,
    });
  }
});
