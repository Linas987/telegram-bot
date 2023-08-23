import {Context as TelegrafContext} from 'telegraf';
import {I18nContext} from '@grammyjs/i18n';

export interface Session {
	game?: number;
	currentlyInGame?: boolean;
	
}

export interface MyContext extends TelegrafContext {
	readonly i18n: I18nContext;
	session: Session;
}
