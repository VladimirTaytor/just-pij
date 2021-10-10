export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6162b90ea31520128b2a45c6',
                  title: 'Sanity Studio',
                  name: 'pj-podcast-studio',
                  apiId: '603b22e4-4fae-4337-ba2e-b57def1ee54c'
                },
                {
                  buildHookId: '6162b90e9d8104abf5d8b22c',
                  title: 'Blog Website',
                  name: 'pj-podcast',
                  apiId: '66241ece-6efc-4781-aa40-d98ed56f9fc3'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/VladimirTaytor/pj-podcast',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://pj-podcast.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
