
# Atividade - refatorar um componente por equipe

https://github.com/thiagok2/reactflix.git 

## Possíveis componentes:
1. CardFilme                                                        Maria Karoline
2. FilmePage -                                                      Ana Luiza
3. CatalogoFilme - criar FilmeCatalogoCard
4. ComentariosContainer - Sugestão: criar ComentarioCard e refatorar
5. CarrosselNum - Usar FilmeCard, refatorar                         Iran
7. Criar UsuarioPage / Playlist* - 
    Na página do usuário, vai ser listadas várias playlists;
    Criar playlistMock.js
    coleção de filmes de um individuo

## Passo a passo

0. Fazer clone do projeto

```sh
git clone https://github.com/thiagok2/reactflix.git 
```

1. Criar branch do seu componente/tarefa
Exemplo:

```sh
git checkout -b cardfilme-plus-equipe-zzzequipe-zzz
```


2. **ATENÇÃO:** Trabalhar, e não alterar demais componentes, **outros seres humanos** estarão trabalhando neles.

3. Versionar
```sh
    git add * 
    git commit -m 'cardfilme - add avaliacoes'
    git pull origin main
    git push origin cardfilme-plus-equipe-zzz
```

4. Ao final, **o professor** leva seu código para a branch principal, main.
Estando na branch main, o professor, faz merge com o código desenvolvido
```sh
    git merge cardfilme-plus-equipe-zzz
```