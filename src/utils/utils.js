export const formatPrice = (value) => {
    if (!Number(value)) {
        return '0';
    } else {
        const val = (Number(value) / 1).toFixed(0).replace('.', ',');
        return ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
};