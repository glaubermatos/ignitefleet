import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ASYNC_KEY } from './storageConfig';

export async function saveLastSyncTimestamp() {
    const timestamp = new Date().getTime();

    await AsyncStorage.setItem(STORAGE_ASYNC_KEY, timestamp.toString());

    return timestamp;
}

export async function getLastAsyncTimestamp() {
    const timestamp = await AsyncStorage.getItem(STORAGE_ASYNC_KEY);

    return Number(timestamp);
}