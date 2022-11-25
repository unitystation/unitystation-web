# Unitystation.org
This repository contains the source code for the Unitystation website, hosted at [unitystation.org](https://unitystation.org/).
We are open to contributions from the community, so feel free to submit a pull request if you have any improvements to suggest. Just make sure
to see in issues if someone else is already working on it, and if not, create a new issue and assign it to yourself. 

We also have a [Discord](https://discord.com/invite/H6EunER) server, where you can ask questions and get help from the community.

## Development
### Requirements
- [Node.js](https://nodejs.org/en/) (v18.x.x LTS or higher)
- The website consumes the [Unitystation Changelog API](https://github.com/unitystation/changelog-api). Some functionalities might not be available if the API is not running.
- The website consumes the [Central Command API](https://github.com/unitystation/central-command). Some functionalities might not be available if the API is not running.

### Technologies you should familiarize yourself with
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/)

### Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. Open [localhost:3000](http://localhost:3000) in your browser
5. Make changes to the code and see them reflected in the browser

### Deployment
The website is automatically deployed to [Unitystation.org](https://unitystation.org/) when a pull request is merged into the `master` branch. Also, any Pull Request that is opened will have a preview deployment, so you can see how your changes will look like before merging.

