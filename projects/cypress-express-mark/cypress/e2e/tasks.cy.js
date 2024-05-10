/// <reference types="cypress"/>

describe('tarefas', () => {

    let testData;

    before (() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {
            const taskName = 'Ler um livro de Node.js'
            //Dado que quero cadastrar uma nova tarefa
            cy.removeTaskByName(taskName)
    
            //Quando cadastro esta nova tarefa
            cy.createTask(taskName)
    
            //Então conseguirei vê-la na lista de tarefas
            cy.contains('main div p', taskName)
            .should('be.visible')
        })
    
        it('não deve permitir tarefa duplicada', () => {
            const task = testData.dup
            //Dado que tenho uma tarefa cadastrada
            cy.removeTaskByName(task.name)
    
            cy.postTask(task)
            
            //Quando cadastrar a mesma tarefa
            cy.createTask(task.name)
            
            //Então receberei um aviso de duplicidade
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })
    
        it('campo obrigatório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
    
        })
    })

    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            const task = { 
                name: 'Pagar contas de consumo', 
                is_done: false 
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.visit('/')
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('exclusão', () => {
        it('deve remover uma tarefa', () => {
            const task = { 
                name: 'Estudar Javascript', 
                is_done: false 
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.visit('/')
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})