import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getKey<T>(key: string): Promise<T | undefined> {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value == null) {
			return undefined;
		}

		return JSON.parse(value);
	} catch (error) {
		return undefined;
	}
}

export async function setKey<T>(key: string, value: T) {
	try {
		if (value != null) {
			AsyncStorage.setItem(key, JSON.stringify(value));
		}
	} catch (error) {
		return;
	}
}

export async function removeKey(key: string) {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {}
}
