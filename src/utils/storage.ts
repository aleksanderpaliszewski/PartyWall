import AsyncStorage from '@react-native-community/async-storage';

export default class Storage {
  static setItem(key: string, value: unknown) {
    return AsyncStorage.setItem(key, serialize(value)).catch(console.error);
  }

  static getItem<T>(key: string): Promise<T | null> {
    return AsyncStorage.getItem(key)
      .then((value) => deserialize<T>(value))
      .catch((error) => {
        console.error(error);

        return null;
      });
  }

  static removeItem<T>(key: string): Promise<void> {
    return AsyncStorage.removeItem(key)
      .then(() => console.log(`key: ${key} removed`))
      .catch(console.error);
  }
}

function serialize(value: unknown) {
  return JSON.stringify(value);
}

function deserialize<T>(value: string | null): T {
  return value ? JSON.parse(value) : null;
}
