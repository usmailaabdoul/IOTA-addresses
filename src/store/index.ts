import { writable } from 'svelte/store';
import type {AddressesProps} from '../types/index';

export const addresses = writable<AddressesProps[]>([]);