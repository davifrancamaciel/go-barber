// sucrase - plugin para usar imports como abaixo

import app from './app';
import { PORT } from './consts';

app.listen(PORT, () => {
	console.log(`🎉 Backend rodando  na PORTA => 😜 ${PORT}`);
});
