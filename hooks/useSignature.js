import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

export default () => {
	const { publicKey, signMessage } = useWallet();

	const sign = async () => {
		try {
			// Encode anything as bytes
			const message = 'Sign this message to authenticate.';
			const encodedMessage = new TextEncoder().encode(message);
			// Sign the bytes using the wallet
			const signedMessage = await signMessage(encodedMessage, 'utf8');
			const publicKeyStr = publicKey?.toBase58();

			const data = {
				publicKeyStr,
				encodedSignedMessage: bs58.encode(signedMessage),
				message
			};

			const res = await fetch('/api/sign', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-type': 'application/json; charset=UTF-8' }
			});

			return { statusCode: res?.status };
		} catch (error) {
			console.log(error);
			return { statusCode: 500 };
		}
	};

	return {
		sign
	};
};
