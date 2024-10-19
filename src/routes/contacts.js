import { Router } from 'express';

import * as contactsControllers from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/IsValidId.js';

const contactRouter = Router();

contactRouter.get(
  '/',
  isValidId,
  ctrlWrapper(contactsControllers.getContactsController),
);

contactRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController),
);

export default contactRouter;
