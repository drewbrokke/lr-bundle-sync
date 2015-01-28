# Liferay Bundle Sync

R.I.P. Liferay fast-deploy setup. At least that's what I hear. At the *very* least there started to be some problems with it, and so I decided I'd get used to not having it sooner rather than kicking-and-screaming-later.

## Usage

For now, commands are run *from the Liferay Bundle Sync directory*.

### Configure source and bundle paths

`npm run config`

### Run

`npm start`

This will start the Gulp watcher on your source directory's `portal-web` folder. Changes will be synced whenever you save a file.