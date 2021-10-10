<svelte:head>
	<title>Just Pij - About</title>
</svelte:head>
<script>
  function getMyAge() {
    const yearOfBirth = new Date('1997-12-31')
    const today = new Date()
    const offset = 1970

    return new Date(today - new Date(yearOfBirth)).getFullYear() - offset
  }
</script>

<h1>About</h1>

<p>Hello, my name is Volodymyr (Pij) Pihol and this is my personal website</p>
<p>I'm {getMyAge()} boy originally from Ukraine</p>
<p>This website is home for my <a href="episodes">music podcast</a>, <a href="blog">blog</a>, and <a href="me">portfolio</a></p>
<p>Enjoy your stay ٩(˘◡˘)۶</p>
<br/>
<p>For any questions: <a href="mailto:volodymyr.pihol@gmail.com">volodymyr.pihol@gmail.com</a></p>
