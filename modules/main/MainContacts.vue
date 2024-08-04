<template>
	<section class="pb-3">
		<v-container>
			<div class="bg-light pt-4 pb-8 px -2 rounded-md box-border">
				<div class="text-(primary xl) font-bold mb-3 md:(text-(3xl))">
					<span class="text-3xl font-extrabold md:(text-(5xl))">iPost</span>
					cargo
				</div>
				<div class="w-full">
					<div class="flex justify-start items-start mb-4 gap-3">
						<IconPhone class="block shrink-0 text-light stroke-gray w-5 h-5" />
						<div>
							<a
								href="tel:87789285092"
								class="block text-inherit no-underline mb-1 md:(text-(xl))"
								>8-778-928-50-92</a
							>
							<div class="flex flex-col lg:(flex-row) gap-2">
								<a
									href="https://chat.whatsapp.com/EcYjywdBwvU0vB9Yu5LPO3"
									class="flex items-center justify-start gap-2 no-underline text-inherit px-2 py-1 border-(1 solid gray/50) rounded-3xl leading-none align-middle"
								>
									<IconWhatsapp class="block shrink-0 w-6 h-6" />
									<span>{{ $t('labels.writeWhatapp') }}</span>
								</a>
								<a
									href=""
									class="flex items-center justify-start gap-2 no-underline text-inherit px-2 py-1 border-(1 solid gray/50) rounded-3xl leading-none align-middle"
								>
									<IconInstagram class="block shrink-0 w-6 h-6" />
									<span>{{ $t('labels.viewInstagram') }}</span>
								</a>
								<a
									href=""
									class="flex items-center justify-start gap-2 no-underline text-inherit px-2 py-1 border-(1 solid gray/50) rounded-3xl leading-none align-middle"
								>
									<IconTelegram
										class="block shrink-0 w-6 h-6 whitespace-pre-line fill-unset"
									/>
									<span>{{ $t('labels.writeTelegram') }}</span>
								</a>
							</div>
						</div>
					</div>
					<div class="flex justify-start items-start mb-4 gap-3">
						<IconMail class="block shrink-0 mt-1 text-gray w-5 h-5" />
						<a
							href="mailto:info@ipost.kz"
							class="text-inherit no-underline md:(text-(xl))"
							>info@ipost.kz</a
						>
					</div>
					<div
						class="w-full flex justify-start items-start gap-3 overflow-hidden"
					>
						<IconMapMarker class="block shrink-0 mt-1 text-gray w-5 h-5" />
						<div class="w-[80%] text-inherit no-underline break-words">
							<div class="mb-1 md:(text-(xl))">
								{{ $t('data.main.address') }}
							</div>
							<div
								class="w-full flex items-stretch justify-start gap-1 overflow-hidden"
							>
								<div
									class="flex items-center gap-2 px-2 py-2 border-(1 solid gray/50) rounded-3xl md:(text-(xl) px-2)"
								>
									<IconTwoGis class="w-4 h-4 rounded-full shrink-0" />
									<span class="text-sm">2gis</span>
								</div>
								<div
									class="flex items-center gap-1 px-1 py-2 border-(1 solid gray/50) rounded-3xl md:(text-(xl) px-2)"
								>
									<IconYandex class="w-4 h-4 shrink-0" />
									<span class="text-sm">Яндекс.Карты</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</v-container>
	</section>
</template>

<script lang="ts" setup>
import IconPhone from '@/assets/svg/phone.svg'
import IconMail from '@/assets/svg/mail.svg'
import IconMapMarker from '@/assets/svg/map-marker.svg'
import IconWhatsapp from '@/assets/svg/whatsapp-filled.svg'
import IconInstagram from '@/assets/svg/instagram.svg'
// @ts-ignore
import IconTelegram from '@/assets/svg/telegram.svg?component'
// @ts-ignore
import IconTwoGis from '@/assets/svg/twogis_map.svg?component'
// @ts-ignore
import IconYandex from '@/assets/svg/yandex_maps.svg?component'
</script>

<style lang="scss" scoped></style>
