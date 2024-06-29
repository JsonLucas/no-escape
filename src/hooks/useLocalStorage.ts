export const useLocalStorage = () => {
    const add = (key: string, value: Object | string) => {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
    }

    const get = (key: string) => {
        try {
            const getLocal = localStorage.getItem(key);
            if(getLocal) return JSON.parse(getLocal);
        } catch (e: any) {
            console.log(e);
        }

        return null;
    }

    const remove = (key: string) => {
        localStorage.removeItem(key);
    }

    return { add, get, remove };
}