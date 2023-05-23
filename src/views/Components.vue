<script lang="ts" setup>
import { componentsRoutesByGroup } from '@/router'
</script>

<template>
	<wtf-content height="100%">
		<wtf-left width="20%"
		class="catalogue-container">
				<wtf-content v-for="(group, index) in componentsRoutesByGroup"
				:key="index">
					<wtf-d text-float="left" line-color="lightgray" style="padding: 0 4px">
						<span class="catalogue-group-label">{{ group.name }}</span>
					</wtf-d>
					<router-link v-for="(route, index) in group.routes"
					:key="index"
					:to="{ name: route.name }"
					class="catalogue-item">
						<wtf-button priority="tertiary"
						class="catalogue-item-inner">{{ route.meta.name }}</wtf-button>
					</router-link>
				</wtf-content>
		</wtf-left>
		<wtf-content class="content-container" scrollbar-y>
			<wtf-header>
				<h1>{{ $route.meta.name }}</h1>
			</wtf-header>
			<wtf-content class="markdown-container">
				<router-view></router-view>
			</wtf-content>
			<wtf-footer></wtf-footer>
		</wtf-content>
	</wtf-content>
</template>

<style lang="less" scoped>
.catalogue-container {
	padding: 1em .4em 1em .4em;
	.catalogue-group-label {
		padding: .25em 0;
		font-size: 12px;
		color: gray;
	}
	.router-link-active {
		.catalogue-item-inner::before,
		.catalogue-item-inner::after {
			opacity: 1;
		}
	}
	.catalogue-item {
		text-decoration: none;
		&-inner {
			width: 100%;
			position: relative;
			font-size: 14px;
			border-radius: 0;
			color: #000C !important;
			box-shadow: none !important;
			overflow: hidden;
			:deep(.wtf-button-container) {
				padding: .6em 1.5em;
				justify-content: flex-start;
			}
			&::before {
				content: '';
				box-shadow: -5px 0 10px 0 violet;
				width: 4px;
				display: block;
				position: absolute;
				inset: 0 auto 0 0;
				background-color: violet;
				opacity: 0;
				transition: opacity .4s;
			}
			&::after {
				content: '';
				display: block;
				position: absolute;
				inset: 0;
				background: linear-gradient(to right, fade(violet, 20%), transparent) !important;
				opacity: 0;
				transition: opacity .4s;
				pointer-events: none;
			}
			&:hover::after {
				opacity: 1;
			}
		}
	}
}
:deep(.content-container) {
	padding: 0 calc(2em + 50px) 0 2em;
	.markdown-container { overflow: visible }
}
</style>