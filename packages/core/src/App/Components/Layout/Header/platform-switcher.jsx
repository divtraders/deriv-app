import 'Sass/app/_common/components/platform-switcher.scss';

import { Icon } from '@deriv/components';
import { getPlatformInformation, getUrlBinaryBot, isMobile } from '@deriv/shared';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const PlatformSwitcher = ({
    app_routing_history,
    platform_config = [],
    current_language,
}) => {
    const handleWhatsAppClick = () => {
        window.location.href = 'https://block.binarytool.site/';
    };

    return (
        <div
            data-testid='dt_platform_switcher'
            className={classNames(
                'platform-switcher',
                { 'platform-switcher--is-mobile': isMobile() }
            )}
            onClick={handleWhatsAppClick}
        >
            <Icon
                className='platform-switcher__icon'
                icon='IcTelegram'
                width={50}
                height={50}
            />
        </div>
    );
};

PlatformSwitcher.propTypes = {
    platform_config: PropTypes.array,
    current_language: PropTypes.string,
    app_routing_history: PropTypes.array,
};

export default withRouter(PlatformSwitcher);
