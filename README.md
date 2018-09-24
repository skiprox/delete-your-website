# Delete your website

> A button to delete your website.

Clicking on the button deletes the `/public` directory of the site, which makes it go away _forever_.

## Getting up and running

You'll need a few things installed to get this to work.

* Node (I'm using `v8.9.0`, but any version new enough to use ES6 _should_ work)
* npm (I'm using `5.5.1`)

To get up and running, clone this project, `cd` into the directory from terminal, and run

```
npm install
```

Once that finishes, you should be good to run it! To do that, first compile the `scss` by doing

```
npm run css
```

and after that finishes just run

```
npm run start
```

to start the server locally. The site should be available at `localhost:5002`.

## Reverting when you delete everything

You'll want to clone this project with git so you can revert after you delete everything. With that, after the delete button is clicked you'll need to do:

```
git checkout public/
```

to get the public directory back. After that, run `npm run css` again to re-compile the `scss` files.