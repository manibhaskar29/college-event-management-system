try {
    const authRouted = require('./routes/authRoutes');
    console.log('Type of authRouted:', typeof authRouted);
    console.log('Is authRouted a function?', typeof authRouted === 'function');
    console.log('Value of authRouted:', authRouted);
} catch (error) {
    console.error('Error importing authRoutes:', error);
}
