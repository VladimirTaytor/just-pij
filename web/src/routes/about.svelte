<svelte:head>
	<title>Just Pij - About</title>
</svelte:head>
<script>
  import {_} from 'svelte-i18n'

  function getMyAge() {
    const yearOfBirth = new Date('1997-12-31')
    const today = new Date()
    const offset = 1970

    return new Date(today - new Date(yearOfBirth)).getFullYear() - offset
  }
</script>

<h1>{$_('about.title')}</h1>

<p>{$_('about.hello')}</p>
<p>{$_('about.me', { values: {age: getMyAge()}})}</p>
<p>{$_('about.enjoy')}</p>
<br/>
<p>{@html $_('about.questions')}</p>
