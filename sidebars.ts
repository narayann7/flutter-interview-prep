const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'welcome',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        'fundamentals/widgets_overview',
        'fundamentals/stateless_vs_stateful',
        'fundamentals/buildcontext_and_lifecycle',
        'fundamentals/keys_in_flutter',
        'fundamentals/container_const_explained',
      ],
    },
    {
      type: 'category',
      label: 'Layouts & Rendering',
      items: [
        'layouts_and_rendering/repaint_boundary',
        'layouts_and_rendering/flexible_and_flex',
        'layouts_and_rendering/custom_paint_and_canvas',
        'layouts_and_rendering/performance_optimization_tips',
      ],
    },
    {
      type: 'category',
      label: 'Dart Language Concepts',
      items: [
        'dart_language_concepts/mixins_in_dart',
        'dart_language_concepts/iterables_vs_lists',
        'dart_language_concepts/async_asyncstar_syncstar',
        'dart_language_concepts/throttle_vs_debounce',
      ],
    },
    {
      type: 'category',
      label: 'Architecture & Engine',
      items: [
        'architecture_and_engine/flutter_engine_internals',
        'architecture_and_engine/tree_shaking',
        'architecture_and_engine/build_modes',
        'architecture_and_engine/state_in_flutter',
        'architecture_and_engine/flutter_trees_and_rendering_pipeline',
      ],
    },
    {
      type: 'category',
      label: 'Packages & Plugins',
      items: [
        'packages_and_plugins/difference_packages_plugins',
        'packages_and_plugins/dependency_management_best_practices',
      ],
    },
    {
      type: 'category',
      label: 'State Management',
      items: [
        'state_management/stateful_widget_lifecycle',
        'state_management/provider_and_inheritedwidget',
        'state_management/bloc_and_riverpod_intro',
        'state_management/comparison_of_state_management',
      ],
    },
    {
      type: 'category',
      label: 'Streams & Async Programming',
      items: [
        'streams_and_async/streams_basics',
        'streams_and_async/stream_transformers',
        'streams_and_async/streambuilder_widget',
        'streams_and_async/best_practices_for_streams',
      ],
    },
    {
      type: 'category',
      label: 'Links & Navigation',
      items: [
        'links_and_navigation/deep_linking',
        'links_and_navigation/dynamic_linking',
        'links_and_navigation/navigation_and_routes',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        'advanced_topics/custom_widget_examples',
        'advanced_topics/animation_with_custompaint',
        'advanced_topics/app_lifecycle_states',
        'advanced_topics/flutter_performance_insights',
      ],
    },
  ],
};

export default sidebars;
