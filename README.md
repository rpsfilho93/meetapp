# meetapp
Desafio Final do Bootcamp GoStack Rocketseat (Meetapp)

Desafio consisti em desenvolver uma aplicação (web e mobile) em que os usuários organizam e se inscrevem em meetups. 

O app mobile foi desenvolvido para a plataforma ANDROID. 

Instruções:

1.Iniciar o backend da aplicação (diretório backend):

#yarn dev

2.Iniciar serviço redis para envio de e-mails (diretório backend):

#yarn queue

3.Iniciar aplicação frontend (diretório frontend):

#yarn start

4.Montar e instalar aplicação mobile (diretório mobile):

#react-native run android

5.Iniciar development server:

#react-native start --reset-cache

6.Conectar aplicação mobile às portas de debug e servers.

#adb reverse tcp:3333 tcp:3333

#adb reverse tcp:9090 tcp:9090

#adb reverse tcp:8081 tcp:8081
