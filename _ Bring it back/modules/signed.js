/*CREATE TABLE `node_signed` (
  `id` int(11) UNSIGNED NOT NULL,
  `created_by_user_id` int(11) UNSIGNED NOT NULL,
  `created_by_entity_id` int(11) UNSIGNED NOT NULL,
  `time_created` int(11) UNSIGNED NOT NULL,
  `updated_by_user_id` int(11) UNSIGNED NOT NULL,
  `updated_by_entity_id` int(11) UNSIGNED NOT NULL,
  `time_updated` int(11) UNSIGNED NOT NULL,
  `published_by_user_id` int(11) UNSIGNED NOT NULL,
  `published_by_entity_id` int(11) UNSIGNED NOT NULL,
  `time_published` int(11) UNSIGNED NOT NULL,
  `node_id` int(11) UNSIGNED NOT NULL,
  `line_id` int(11) UNSIGNED NOT NULL,
  `pointer_state_time` int(11) UNSIGNED NOT NULL,
  `language_id` int(11) UNSIGNED NOT NULL,
  `closed_by_user_id` int(11) UNSIGNED NOT NULL,
  `closed_by_entity_id` int(11) UNSIGNED ZEROFILL NOT NULL,
  `time_closed` int(11) UNSIGNED NOT NULL,
  `removed_by_user_id` int(11) UNSIGNED NOT NULL,
  `removed_by_entity_id` int(11) UNSIGNED NOT NULL,
  `time_removed` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;*/

import SimpleSchema from 'simpl-schema';

