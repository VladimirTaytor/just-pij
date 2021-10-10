<script>
	export let segment;
	import Donate from './Donate.svelte'
</script>

<style>
	nav {
		border-bottom: 1px solid var(--primary__color_light);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
    display: flex;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: var(--primary__color_dark);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
		<li><a rel=prefetch class='{segment === "episodes" ? "selected" : ""}' href='episodes'>podcast</a></li>
		<li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog</a></li>
    <li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li>
    <li style="flex-grow: 1"></li>
    <li><Donate/></li>
	</ul>
</nav>
