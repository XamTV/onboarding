import type {ServiceAccount} from 'firebase-admin/app';
import {cert, initializeApp} from 'firebase-admin/app';
import {initializeFirestore} from 'firebase-admin/firestore';

import * as credentials from '../google-credentials.json';

const admin = initializeApp({
  credential: cert(credentials as ServiceAccount),
});

initializeFirestore(admin);
