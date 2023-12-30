import app from './app';
import { APP_PORT } from './config';

app.listen(APP_PORT, () => console.log(`Server is running on port ${APP_PORT}`));
