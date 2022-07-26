<script setup>
import { computed } from 'vue';
import AppPopup from '@/2v/shared/components/popup/AppPopup.vue';
import AppPopupHead from '@/2v/shared/components/popup/build/head/AppPopupHead.vue';
import AppPopupBody from '@/2v/shared/components/popup/build/body/AppPopupBody.vue';
import CopyButton from '@/2v/shared/components/copy/CopyButton.vue';
import ShareButton from '@/2v/features/share/components/button/ShareButton';
import VButton from '@/2v/shared/components/common/button/VButton.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import { useI18n } from 'vue-i18n';
import { usePopup } from '@/2v/shared/hooks/usePopup';
import { ellipseLink } from '../../utils/link'; 
import { isMobile } from '@/2v/app/utils/isMobile';

defineProps({
    code: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const { t } = useI18n();
const { isPopupOpen: isShareOpen, openPopup: openShare } = usePopup();

const socials = [
    { network: 'twitter' },
    { network: 'facebook' },
    { network: 'reddit' },
    { network: 'whatsapp' },
    { network: 'telegram' }
];

const shareMetadata = computed(() => ({
    title: t('affiliate.shareTitle'),
    description: t('affiliate.shareDescription')
}));
</script>

<template>
    <div :class="styles.hero">
    
        <div :class="styles.image" />

        <div :class="styles.main">
            <div :class="styles.title">
                <div :class="styles.titleText">
                    {{ t('affiliate.promo') }}
                </div>

                <VIcon
                    name="three-smiles"
                    :class="styles.titleSmiles"
                />
            </div>

            <!-- Real Link -->
            <RouterLink
                to="/"
                :class="styles.link"
            >
                <div :class="styles.linkText">
                    {{ t('affiliate.rules') }}
                </div>

                <div :class="styles.linkIcon">
                    <VIcon name="arrow-right-xs" />
                </div>
            </RouterLink>
        </div>

        <div :class="styles.side">
            <div :class="styles.field">
                <div :class="styles.fieldLabel">
                    {{ t('affiliate.codeField') }}
                </div>

                <div :class="styles.fieldContent">
                    <CopyButton
                        :value="code"
                        :class="styles.fieldButton"
                    >
                        <div :class="styles.fieldValue">
                            {{ code }}
                        </div>

                        <div :class="styles.fieldCopy">
                            <VIcon name="copy" />
                        </div>
                    </CopyButton>
                </div>
            </div>

            <div :class="styles.field">
                <div :class="styles.fieldLabel">
                    {{ t('affiliate.linkField') }}
                </div>

                <div :class="styles.fieldContent">
                    <CopyButton
                        :value="link"
                        :class="styles.fieldButton"
                    >
                        <div :class="styles.fieldValue">
                            {{ ellipseLink(link) }}
                        </div>

                        <div :class="styles.fieldCopy">
                            <VIcon name="copy" />
                        </div>
                    </CopyButton>
                </div>
            </div>
        </div>

        <VButton
            size="xs"
            :class="styles.shareButton"
            @click="openShare"
        >
            {{ t('button.share') }}
        </VButton>

        <!-- TODO: width 460px for popup -->
        <AppPopup v-model="isShareOpen">
            <AppPopupHead>
                {{ t('affiliate.share') }}
            </AppPopupHead>

            <AppPopupBody>
                <div :class="styles.share">
                    <div :class="styles.shareImage" />

                    <div :class="styles.shareButtons">
                        <!-- TODO: add media -->
                        <ShareButton
                            v-for="({ network }) in socials"
                            :key="network"
                            :network="network"
                            :url="link"
                            :title="shareMetadata.title"
                            :description="shareMetadata.description"
                            :mobile="isMobile"
                        >
                            <VIcon :name="network" />
                        </ShareButton>

                        <CopyButton
                            :value="link"
                            :class="styles.copyButton"
                        >
                            <VIcon name="link" />
                        </CopyButton>
                    </div>
                </div>
            </AppPopupBody>
        </AppPopup>

    </div>
</template>

<style lang="scss" module="styles">
@import './AffiliateHero.module.scss';
</style>