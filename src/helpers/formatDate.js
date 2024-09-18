export const formatDate = (dateString) => {
    if (!dateString) {
        return 'Fecha no disponible';
      }
    
      const [day, month, year] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
    
      const options = { day: 'numeric', month: 'long' };
    
      return date.toLocaleDateString('es-ES', options);
};
