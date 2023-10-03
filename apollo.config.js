module.exports = {
   client: {
      includes: ['./src/**/*.{tsx,ts}'],
      tagName: 'gql',
      service: {
         name: 'nuber-eats-backend',
         url: 'http://localhost:8000/graphql',
      },
   },
};
